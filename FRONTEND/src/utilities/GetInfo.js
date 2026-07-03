import React, { useEffect, useContext } from "react";
import UserContext from "./ContextApi.jsx";
import { useCurrentUser } from "./userLogged.jsx";
import api from "./Api.js";

function GetInfo() {
  const { setStudent, setLoading, setLoggedIn, setHomeInfo } =
    useContext(UserContext);

  const fetchData = async (controller) => {
    try {
      setLoading(true);

      const timer = new Promise(
        (resolve) => setTimeout(resolve, 2000), // minimum 2 seconds
      );

      const res = api.get("/api/getdata", {
        withCredentials: false,
        signal: controller.signal,
      });

      const [_, response] = await Promise.all([timer, res]);

      setStudent(response.data.data);
      setLoading(false);
    } catch (error) {
      // Ignore if the request was cancelled
      if (error.name !== "CanceledError") {
        console.log("ERROR:", error);
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    const controller = new AbortController();

    fetchData(controller);

    return () => {
      controller.abort();
    };
  }, []);

  const { data, error, isLoading } = useCurrentUser();

  useEffect(() => {
    if (isLoading) return;

    if (error) {
      setLoggedIn(false);
      setHomeInfo({});
      console.log(error.message);
      return;
    }

    setHomeInfo(data?.data);
    setLoggedIn(true);
  }, [data, error, isLoading]);

  return null;
}

export default GetInfo;
