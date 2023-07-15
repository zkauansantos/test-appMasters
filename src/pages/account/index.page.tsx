import { useRouter } from "next/router";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";

import { toast } from "react-toastify";
import { parseCookies, setCookie } from "nookies";

import { doc, updateDoc } from "firebase/firestore";
import { database, storage } from "@/firebase/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import { AuthContext } from "@/contexts/AuthContext";

import avatar from "@/assets/imgs/avatar.png";

import Button from "@/components/Button";

import { Input } from "@/styles/shared/Input";
import { AccountContainer, AccountWrapper, FormUserEdit } from "./styles";

export default function Account() {
  const { user, setUser } = useContext(AuthContext);
  const { "user-id": userId } = parseCookies();
  const [newName, setNewName] = useState("");
  const [newPhotoUrl, setNewPhotoUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (!userId) {
      router.push("/");
    }

    return;
  }, [user, router, userId]);

  async function handleUpdate(e: any) {
    e.preventDefault();

    if (!newPhotoUrl && !newName.trim()) return;
    let updatedUser: any = {};

    if (newPhotoUrl) {
      const file = e.target[1].files[0];
      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const newProgress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(newProgress);
          },
          (error) => {
            reject();
            toast.error("Ops! ocorreu um erro no upload na imagem!");
          },
          async () => {
            await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              setNewPhotoUrl(url);
              updatedUser.newPhoto = url;
            });
            resolve("");
          }
        );
      });
    } else {
      updatedUser.newPhoto = user?.photoUrl;
    }

    if (newName) {
      updatedUser.name = newName;
    } else {
      updatedUser.name = user?.name;
    }

    try {
      await updateDoc(doc(database, "users", userId), {
        name: updatedUser.name,
        photoUrl: updatedUser.newPhoto,
      });

      setCookie(undefined, "user-name", updatedUser.name);
      setCookie(undefined, "user-photo", updatedUser.newPhoto);

      setUser({
        id: userId,
        name: updatedUser.newName,
        photoUrl: updatedUser.newPhoto,
      });

      setNewName("");
      setNewPhotoUrl("");
      setProgress(0);
      toast.success("Dados atualizados com sucesso!");
    } catch (err) {
      toast.error("Ops! ocorreu um erro ao editar seus dados!");
    }
  }

  function onSelectPhoto(photo: File | undefined) {
    if (photo) {
      if (["image/jpeg", "image/png", "image/jpg"].includes(photo.type)) {
        setNewPhotoUrl(URL.createObjectURL(photo));
        return;
      }
    }

    toast.warn("Por favor selecione uma foto!");
    setNewPhotoUrl("");
  }

  return (
    <AccountContainer>
      <AccountWrapper>
        {!newPhotoUrl && (
          <Image
            src={
              !!user?.photoUrl && user.photoUrl !== "null"
                ? user.photoUrl
                : avatar
            }
            width={550}
            height={400}
            alt="photo-user"
            priority
          />
        )}

        {newPhotoUrl && (
          <Image
            src={newPhotoUrl}
            width={650}
            height={400}
            alt="photo-user"
            priority
          />
        )}

        <FormUserEdit onSubmit={handleUpdate}>
          <strong>Editar cadastro</strong>

          <div className="inputs-container">
            <Input
              type="text"
              name="name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />

            <Input
              type="file"
              accept="image/*"
              onChange={(e) => onSelectPhoto(e.target.files?.[0])}
            />
          </div>

          <Button type="submit">Editar</Button>

          <progress value={progress} max={100} />
        </FormUserEdit>
      </AccountWrapper>
    </AccountContainer>
  );
}
