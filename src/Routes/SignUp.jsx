import React from "react";
import { BsFacebook, BsApple } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { SiMicrosoftoffice, SiLivejournal } from "react-icons/si";
import { AiFillTwitterCircle } from "react-icons/ai";
import {
  Flex,
  Button,
  Checkbox,
  Link,
  Input,
  Text,
  Divider,
  Stack,
  Box,
  Heading,
} from "@chakra-ui/react";
import styles from "../CSS/Login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { signupAPI } from "../store/auth/auth.actions";
import LeftBox from "../Components/LeftBox";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const SignUp = () => {
  const { loading, error, isRegisterd, message } = useSelector(
    (store) => store.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSignUp = () => {
    dispatch(signupAPI({ email: email }));
    if (!error) navigate("/login");
    else if (
      error &&
      message ===
        "Cannot create a User with existing Email, Please try another one"
    )
      navigate("/login");
  };

  useEffect(() => {
    if (isRegisterd) navigate("/login");
  }, []);

  return (
    <Flex gap="60px">
      <LeftBox />
      <Stack>
        {loading && <Heading>Loading...</Heading>}
        {error && <Heading>Error:- {message}</Heading>}
        <Text className={styles.txhd}>Bitrix24 Registration</Text>
        <Divider />
        <Text mt="100px" className={styles.txl1}>
          Use your social account to register
        </Text>
        <Flex mb="100px" justify="space-around" gap={10}>
          <BsFacebook size="35px" color="#38659f" />
          <Flex align="center">
            <FcGoogle size="20px" />
            Google
          </Flex>
          <Box
            backgroundColor="black"
            size="35px"
            p={2}
            borderRadius="50%"
            align="center"
          >
            <BsApple size="30px" color="white" />
          </Box>
          <SiMicrosoftoffice size="35px" color="#eb3c00 " />
          <SiLivejournal color="#1ea1f2" size="35px" />
          <AiFillTwitterCircle size="35px" color="#1ea1f2" />
        </Flex>
        <Flex gap={5} align="center">
          <Divider />
          <Text>or</Text>
          <Divider />
        </Flex>
        <Text mt="50px" className={styles.txlevel}>
          Enter Email
        </Text>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your Email-ID"
          maxW={"400px"}
        />
        <Text mt="50px" className={styles.txl2}>
          By registering you confirm that you accept the Terms of Service and
          the Privacy Policy.
        </Text>
        <Checkbox defaultChecked className={styles.txl2}>
          I want to receive product updates info and special offers
        </Checkbox>
        <Checkbox defaultChecked className={styles.txl2}>
          I want to receive training materials
        </Checkbox>
        <Divider />
        <Flex gap={4}>
          <Button borderRadius="20px" bg="#bdf300" onClick={handleSignUp}>
            REGISTER FOR FREE
          </Button>
          <Button variant="unstyled">I HAVE A COUPON</Button>
        </Flex>
        <Text className={styles.txl2}>
          This site is protected by reCAPTCHA and the Google Privacy Policy and
          Terms of Service apply
        </Text>
        <Link>Need help?</Link>
      </Stack>
    </Flex>
  );
};

export default SignUp;
