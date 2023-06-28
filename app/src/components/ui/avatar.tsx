import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { styled } from "../../../styled-system/jsx";

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

export const Avatar = (props) => (
  <AvatarRoot>
    <AvatarImage src={props.src} alt={props.name} />
    <AvatarFallback delayMs={0}>{getInitials(props.name)}</AvatarFallback>
  </AvatarRoot>
);

export const AvatarRoot = styled(AvatarPrimitive.Root, {
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    verticalAlign: "middle",
    overflow: "hidden",
    userSelect: "none",
    borderRadius: "100%",
  },
  variants: {
    size: {
      sm: {
        width: "20px",
        height: "20px",
      },
      md: {
        width: "32px",
        height: "32px",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const AvatarImage = styled(AvatarPrimitive.Image, {
  base: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "inherit",
  },
});

export const AvatarFallback = styled(AvatarPrimitive.Fallback, {
  base: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "gray.500",
    fontSize: "14px",
    lineHeight: 1,
    fontWeight: 500,
    bg: "gray.300",
    _dark: {
      bg: "gray.400",
    },
  },
});
