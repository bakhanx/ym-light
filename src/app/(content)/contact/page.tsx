"use client";

import React from "react";
import Image from "next/image";
import FormInput from "@/components/form-input";
import FormButton from "@/components/form-button";
import { useFormState } from "react-dom";
import { handleForm } from "./handlers/handleForm";
import InfoBlock from "./_components/info-block";
import ContactInfo from "./_components/contact-info";
import ContactDetails from "./_components/contact-details";
import ContactForm from "./_components/contact-Form";

const Contact = () => {
  const [state, dispatch] = useFormState(handleForm, null);

  return (
    <>
      <div className="bg-black">
        <div className="Image-Wrap h-full w-full sm:h-screen">
          <div className="absolute h-full w-full">
            <div className="relative h-full w-full">
              <Image
                src="/images/contact.jpg"
                alt="contact"
                fill
                placeholder="blur"
                blurDataURL="/images/base64/blur_contact"
                className="object-cover"
              />
              <div className="h-full w-full bg-black opacity-80" />
            </div>
          </div>

          <div className="Content-Wrap mx-auto flex max-w-screen-xl items-center px-2 pb-12 pt-24 sm:px-4 sm:pt-28 xl:px-0 ">
            <div className="z-20 flex w-full gap-x-4 pt-8 text-white  ">
              <div className="left flex w-[50%] flex-col items-center">
                <div className="flex flex-col gap-y-10">
                  <ContactInfo />

                  <ContactDetails />
                </div>
              </div>

              <div className="right flex w-[50%] flex-col items-center ">
                <div className="flex w-full flex-col sm:w-[80%]">
                  <p className="text-xl font-bold sm:text-3xl ">Contact Us</p>
                  <p>
                    <span className="text-red-500">* </span>
                    <span className="text-sm opacity-70">
                      는 필수 양식입니다.
                    </span>
                  </p>

                  <div className="w-full pt-5">
                    <ContactForm state={state} dispatch={dispatch} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
