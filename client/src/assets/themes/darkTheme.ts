import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          background: "var(--black-6)",
          borderRadius: "var(--radius-5)",
          margin: "8px auto",
        },
      },
      defaultProps: {
        size: "small",
        fullWidth: true,
        InputProps: { style: { color: "var(--gray-light)" } },
        InputLabelProps: { style: { color: "var(--gray-light)" } },
      },
    },
    MuiButton: {
      styleOverrides: {
        outlined: {
          border: "1px solid var(--black-6)",
        },
      },
      defaultProps: {
        variant: "contained",
      },
    },
  },
});
