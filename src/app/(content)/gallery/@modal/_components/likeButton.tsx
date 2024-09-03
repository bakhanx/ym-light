"use client";

import { HandThumbUpIcon as HandThumbUpIconSolid } from "@heroicons/react/16/solid";
import { HandThumbUpIcon as HandThumbUpIconOutline } from "@heroicons/react/24/outline";

import React, { startTransition, useOptimistic } from "react";
import { dislikeGallery, likeGallery } from "../(.)[id]/action";

type LikeButtonProps = {
  isLiked: boolean;
  galleryId: number;
  likeCount: number;
};

const LikeButton = ({ isLiked, galleryId, likeCount }: LikeButtonProps) => {
  const [state, reducerFn] = useOptimistic(
    { isLiked, likeCount }, // InitialState
    (previousState, payload) => ({
      isLiked: !previousState.isLiked,
      likeCount: previousState.isLiked
        ? previousState.likeCount - 1
        : previousState.likeCount + 1,
    }),
  );

  const handleButtonClick = async () => {
    startTransition(() => {
      reducerFn(undefined);
    });

    isLiked ? await dislikeGallery(galleryId) : await likeGallery(galleryId);
  };
  return (
    <button onClick={handleButtonClick} className="flex items-center gap-x-1">
      {state.isLiked ? (
        <HandThumbUpIconSolid className="size-5 text-blue-500" />
      ) : (
        <HandThumbUpIconOutline className="size-5" />
      )}
      {state.likeCount}
    </button>
  );
};

export default LikeButton;
