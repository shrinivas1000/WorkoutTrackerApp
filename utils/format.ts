export const formatLabel = (raw: string) => {
    if (!raw) return "";
  
    return raw
      .split("_")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  