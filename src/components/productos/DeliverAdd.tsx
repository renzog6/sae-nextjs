import {
  Modal,
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
import React, { useEffect } from "react";

import { Producto } from "../../interfaces/producto";
import { SubmitHandler, useForm } from "react-hook-form";
import { useProductoContext } from "../../contexts/productoContext";

export default function DeliverAdd({ isOpen, onClose, data }) {
  const productoCtx = useProductoContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Producto>({
    defaultValues: {
      id: data.id,
      nombre: data.nombre,
      tipo: data.tipo,
      stock: 0,
      info: data.info,
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

  const onSubmit: SubmitHandler<Producto> = (datax) => {
    /*     const { data, error } = await supabase.from("productos").insert([
      {
        nombre: datax.nombre,
        tipo: datax.tipo,
        stock: datax.stock,
        info: datax.info,
      },
    ]); 
    if (error) console.log(error.message);
    else handleModalClose(datax); */

    productoCtx.addToDeliverList(datax);
    handleModalClose(datax);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Agregar Producto</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Nombre</FormLabel>
                <Input id="nombre" {...register("nombre")} disabled={true} />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Tipo</FormLabel>
                <Input id="tipo" {...register("tipo")} disabled={true} />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Stock</FormLabel>
                <Input
                  id="stock"
                  {...register("stock", { required: true, minLength: 1 })}
                  type="number"
                />
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
