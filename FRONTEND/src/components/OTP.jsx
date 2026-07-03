import { useRef, useState, useEffect } from "react";

function OTP({ data, OTPBorder, setRedSend }) {
  const [arr, setArr] = useState(new Array(6).fill(""));
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [OTPBorderCorrection, setOTPBorerCorrection] = useState(false);
  const [timer, setTimer] = useState(60);
  const refd = useRef([]);

  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const resendOTP = () => {
    if (timer > 0) return;

    setArr(new Array(6).fill(""));
    setTimer(60);
    setRedSend();
  };

  useEffect(() => {
    setOTPBorerCorrection(OTPBorder);
  }, [OTPBorder]);

  useEffect(() => {
    data(arr);
  }, [arr]);

  const nextfocus = (index) => {
    refd.current[index + 1]?.focus();
  };

  const Work = (e, index) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      refd.current[index - 1]?.focus();
    }

    if (e.key === "ArrowRight") {
      refd.current[index + 1]?.focus();
    }
    if (e.key === "Backspace") {
      if (e.key === "Backspace") {
        e.preventDefault();
        if (OTPBorderCorrection) setOTPBorerCorrection(false);

        const newArr = [...arr];

        if (newArr[index]) {
          // current box has a digit
          newArr[index] = "";
          setArr(newArr);
          refd.current[index - 1]?.focus();
        } else {
          // current box already empty
          refd.current[index - 1]?.focus();
        }
      }
    }
  };
  return (
    <>
      <div>Enter the OTP</div>
      <div className=" flex gap-1 justify-center items-center">
        {arr.map((value, index) => {
          return (
            <div key={index}>
              <input
                className={` w-10 h-10 text-center text-xl ${OTPBorderCorrection ? "border border-red-500" : "border"}`}
                onFocus={() => {
                  setFocusedIndex(index);
                }}
                type="text"
                ref={(e) => (refd.current[index] = e)}
                onChange={(e) => {
                  if (OTPBorderCorrection) setOTPBorerCorrection(false);
                  const value = e.target.value.replace(/\D/g, "");
                  const newArr = [...arr];
                  newArr[index] = value.slice(-1);
                  setArr(newArr);
                  if (value) nextfocus(index);
                }}
                value={arr[index]}
                onKeyDown={(e) => Work(e, index)}
              />
            </div>
          );
        })}
      </div>
     
        <div className="flex justify-between px-2">
          <button
            type="button"
            disabled={timer > 0}
            onClick={resendOTP}
            className={timer > 0 ? "text-gray-400" : "text-blue-600"}
          >
            Resend?
          </button>

          <span>Timer: 00:{String(timer).padStart(2, "0")}</span>
        </div>
    </>
  );
}

export default OTP;
