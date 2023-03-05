import { Global } from "@mantine/core";
import regular from "./Inter-Regular.ttf";
import bold from "./Inter-Bold.ttf";

const CustomFonts = () => {
  return (
    <Global
      styles={[
        {
          "@font-face": {
            fontFamily: "Inter",
            src: `url('${regular}')`,
            fontWeight: 500,
            fontStyle: "normal",
          },
        },
        {
          "@font-face": {
            fontFamily: "Inter",
            src: `url('${bold}')`,
            fontWeight: 700,
            fontStyle: "normal",
          },
        },
      ]}
    />
  );
};

export default CustomFonts;
