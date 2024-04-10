"use client";

import "react-image-crop/dist/ReactCrop.css";
import ReactCrop, { Crop, makeAspectCrop } from "react-image-crop";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { Input } from "@/components/ui/input";
import { FormError } from "@/components/form-error";
import { Button } from "@/components/ui/button";
import { newAvatarAction } from "@/actions/new-avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useSession } from "next-auth/react";
import { useToast } from "./ui/use-toast";

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

type UserNewAvatarProps = {
  closeModal: () => void;
  setNewAvatar: Dispatch<SetStateAction<string>>;
};

export function UserNewAvatar({
  closeModal,
  setNewAvatar,
}: UserNewAvatarProps) {
  const { toast } = useToast();
  const { update } = useSession();
  const user = useCurrentUser();
  const [error, setError] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState<Crop>();

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.addEventListener("load", () => {
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || "";
      imageElement.src = imageUrl;

      imageElement.addEventListener("load", (e) => {
        setError("");
        const { naturalWidth, naturalHeight } =
          e.currentTarget as HTMLImageElement;
        if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
          setError("Image must be at least 150 x 150 pixels.");
          return setImgSrc("");
        }
      });

      setImgSrc(imageUrl);
    });

    reader.readAsDataURL(file);
  };

  const handleImageLoad = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height,
    );
    setCrop(crop);
  };

  const handleClick = async () => {
    const result = await newAvatarAction(imgSrc, user?.id);

    if (result.success) {
      update();
      setNewAvatar(imgSrc);
      toast({
        variant: "default",
        title: "Success",
        description: result.success,
      });
    }

    if (result.error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error,
      });
    }

    closeModal();
  };

  return (
    <>
      <label className="block mb-3 w-fit">
        <span className="sr-only">Choose profile photo</span>
        <Input
          type="file"
          accept="image/*"
          onChange={onSelectFile}
          className="block border-none w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:hover:cursor-pointer file:text-xs file:bg-muted file:text-foreground hover:file:bg-muted/50 "
        />
      </label>
      <FormError message={error} />
      {imgSrc && (
        <div className="flex flex-col items-center">
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            circularCrop
            keepSelection
            aspect={ASPECT_RATIO}
            minWidth={MIN_DIMENSION}
          >
            <img
              src={imgSrc}
              alt="upload"
              style={{ maxHeight: "70vh" }}
              onLoad={handleImageLoad}
            />
          </ReactCrop>
          <Button onClick={handleClick}>Update avatar</Button>
        </div>
      )}
    </>
  );
}
