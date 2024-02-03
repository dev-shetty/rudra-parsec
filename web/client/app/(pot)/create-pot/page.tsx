"use client";
import { getUser } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { motion, useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const [loading, isLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  function generateUniqueId() {
    return `pot_${Math.random().toString(36).substr(2, 9)}`;
  }
  const [potCode, setPotCode] = useState(() => generateUniqueId());
  const { toast } = useToast();

  const fetchUser = async () => {
    const user = await getUser();
    setUser(user);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      creator: user?.user_metadata.name,
    }));
  }, [user]);

  const supabase = createClientComponentClient();

  const [formData, setFormData] = useState({
    purpose: "",
    creator: user?.user_metadata.name ?? "",
    numberOfMembers: "",
    goalAmount: "",
    amountPerHead: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    isLoading(true);

    if (
      Number(formData.numberOfMembers) < 2 ||
      Number(formData.numberOfMembers) > 20
    ) {
      isLoading(false);
      return alert("Number of members should be between 2 and 20");
    }

    const potData = {
      purpose: formData.purpose,
      creator: user.id,
      goal_amount: Number(formData.goalAmount),
      total_members: Number(formData.numberOfMembers),
      amount_per_head:
        Number(formData.goalAmount) / Number(formData.numberOfMembers),
      pot_code: generateUniqueId(),
      members: null,
    };

    console.log(potData);
    const { error, data } = await supabase
      .from("pot")
      .insert([potData])
      .single();
    if (!error) {
      toast({
        title: "Pot created successfully",
        variant: "success",
      });
      isLoading(false);
      router.push(`/create-pot/waiting?pot_code=${potCode}`);
    } else {
      console.log(error);
    }
  };

  const ref = React.useRef(null);
  const isInView = useInView(ref) as boolean;

  const FADE_DOWN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: -20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", delay: 0.2 } },
  };

  const FADE_UP_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", delay: 0.2 } },
  };
  return (
    <motion.div
      className="container relative min-h-[100dvh] flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0"
      initial="hidden"
      ref={ref}
      animate={isInView ? "show" : "hidden"}
      viewport={{ once: true }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.15,
          },
        },
      }}
    >
      <motion.h1 variants={FADE_DOWN_ANIMATION_VARIANTS}>
        <div className="relative hidden h-full flex-col text-white lg:flex">
          <img
            // quality={100}
            // priority
            src="/pot.png"
            className="relative bg-black object-cover w-full h-full z-20"
            width={500}
            height={500}
            alt="login-image"
          ></img>
        </div>
      </motion.h1>
      <motion.h1 variants={FADE_UP_ANIMATION_VARIANTS}>
        <div className="lg:p-8 flex min-h-screen justify-center items-center">
          <div className="mx-auto flex flex-col justify-center space-y-6 w-[350px]">
            <form
              className="max-w-7xl flex flex-col gap-5"
              onSubmit={handleSubmit}
            >
              <h1 className="font-semibold text-2xl">Create a Pot</h1>
              <div>
                <Label>Purpose</Label>
                <Input
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleInputChange}
                  disabled={loading}
                  placeholder="Purpose"
                  type="text"
                  className="w-full"
                ></Input>
              </div>
              <div>
                <Label>Creator</Label>
                <div>{formData.creator}</div>
                <Input
                  name="creator"
                  value={formData.creator}
                  // onChange={handleInputChange}
                  disabled
                  placeholder="Creator"
                  type="text"
                  className="w-full"
                ></Input>
              </div>
              <div>
                <Label>Goal Amount</Label>
                <Input
                  name="goalAmount"
                  value={formData.goalAmount}
                  onChange={handleInputChange}
                  disabled={loading}
                  placeholder="Goal Amount"
                  type="number"
                  className="w-full"
                ></Input>
              </div>
              <div>
                <Label>Number of members</Label>
                <Input
                  name="numberOfMembers"
                  value={formData.numberOfMembers}
                  onChange={handleInputChange}
                  disabled={loading}
                  placeholder="Number of members"
                  type="number"
                  className="w-full"
                ></Input>
              </div>
              <div>
                <Label>Amount per head</Label>
                <Input
                  name="amountPerHead"
                  value={(
                    Number(formData.goalAmount) /
                    Number(formData.numberOfMembers)
                  ).toFixed(2)}
                  // onChange={handleInputChange}
                  placeholder="Amount per head"
                  type="number"
                  className="readonly w-full"
                ></Input>
              </div>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? (
                  <div className="flex items-center gap-2">
                    Create
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                    >
                      <g
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-width="2"
                      >
                        <path
                          stroke-dasharray="60"
                          stroke-dashoffset="60"
                          stroke-opacity=".3"
                          d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"
                        >
                          <animate
                            fill="freeze"
                            attributeName="stroke-dashoffset"
                            dur="1.3s"
                            values="60;0"
                          />
                        </path>
                        <path
                          stroke-dasharray="15"
                          stroke-dashoffset="15"
                          d="M12 3C16.9706 3 21 7.02944 21 12"
                        >
                          <animate
                            fill="freeze"
                            attributeName="stroke-dashoffset"
                            dur="0.3s"
                            values="15;0"
                          />
                          <animateTransform
                            attributeName="transform"
                            dur="1.5s"
                            repeatCount="indefinite"
                            type="rotate"
                            values="0 12 12;360 12 12"
                          />
                        </path>
                      </g>
                    </svg>
                  </div>
                ) : (
                  <div>Create</div>
                )}
              </Button>
            </form>
          </div>
        </div>
      </motion.h1>
    </motion.div>
  );
};

export default page;
