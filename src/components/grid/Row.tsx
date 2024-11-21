import { Grid } from "@mui/material";
import React, { FC } from "react";

interface RowProps {
  className?: string;
  children: React.ReactNode;
}

export const Row: FC<RowProps> = ({ className, children }) => {
  return (
    <Grid container rowSpacing={1} className={className}>
      {children}
    </Grid>
  );
};
