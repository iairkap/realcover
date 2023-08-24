import { useState, useEffect } from "react";

function useFormattedDate(isoDate) {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    if (isoDate) {
      const dateObj = new Date(isoDate);
      const day = String(dateObj.getUTCDate()).padStart(2, "0");
      const month = String(dateObj.getUTCMonth() + 1).padStart(2, "0");
      const year = dateObj.getUTCFullYear();

      setFormattedDate(`${day}/${month}/${year}`);
    }
  }, [isoDate]);

  return formattedDate;
}

export default useFormattedDate;
