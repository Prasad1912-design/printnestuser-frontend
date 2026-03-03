// src/Loader/LoaderFunction.js
import { useEffect, useState } from "react";
import Loader from "./Loader";

export default function LoaderFunction({ onFinish, delay = 1500 }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      onFinish?.(); // call onFinish callback (only if provided)
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, onFinish]);

  return loading ? <Loader /> : null;
}
