import { Grid } from "@mui/material";
import { FC } from "react";

interface ColProps {
  children: React.ReactNode;
  xs?: number;
  sm?: number;
  md?: number;
  className?: string;
}

export const Col: FC<ColProps> = ({ children, xs, sm, md, className }) => {
  return (
    <Grid item xs={xs} sm={sm} md={md} className={className}>
      {children}
    </Grid>
  );
};
