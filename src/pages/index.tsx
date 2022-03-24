import { useEffect, useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import { Box } from "@chakra-ui/react";
import { useUser } from "@auth0/nextjs-auth0";

const Index = () => {
  const { user, error, isLoading } = useUser();
  console.log(user);

  return (
    <>
      <h1>Hola</h1>
      <p>{JSON.stringify(user)}</p>
    </>
  );
};

export default Index;
