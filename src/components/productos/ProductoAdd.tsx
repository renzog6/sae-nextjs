import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useToast,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React from "react";

import { Producto } from "../../interfaces/producto";
import { SubmitHandler, useForm } from "react-hook-form";
import { supabase } from "../../services/supabase";

export default function ProductModal({ isOpen, onClose }) {
  console.log("ProductModal");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Producto>({
    defaultValues: {
      nombre: "",
      tipo: "",
      stock: 0,
      info: "",
    },
  });

  const toast = useToast();

  const handleModalClose = (data: Producto) => {
    console.log("handle: ", data.nombre);
    toast({
      title: "Purchase successsful." + data.nombre,
      description: "{ data }",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    setTimeout(() => {
      onClose();
      reset();
    }, 1000);
  };

  const onSubmit: SubmitHandler<Producto> = async (datax) => {
    console.log("onSub: ", datax.nombre);
    let d = JSON.stringify(datax);
    console.log(d);
    const { data, error } = await supabase.from("productos").insert([
      {
        nombre: datax.nombre,
        tipo: datax.tipo,
        stock: datax.stock,
        info: datax.info,
      },
    ]);
    if (error) console.log(error.message);
    else handleModalClose(datax);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Agregar Producto</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Nombre</FormLabel>
                <Input
                  id="nombre"
                  {...register("nombre", { required: true })}
                  placeholder="Nombre producto"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Tipo</FormLabel>
                <Input
                  id="tipo"
                  {...register("tipo", { required: true })}
                  placeholder="Tipo"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Stock</FormLabel>
                <Input id="stock" {...register("stock")} type="number" />
              </FormControl>

              <FormControl>
                <FormLabel>Info</FormLabel>
                <Input
                  id="info"
                  {...register("info")}
                  placeholder="Detalle / Observacion"
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                mr={3}
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
              >
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
