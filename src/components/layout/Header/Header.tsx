import { faVideoCamera, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Header.module.scss";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Menu,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { HeaderMenu } from "./HeaderMenu";
import { Link } from "react-router-dom";

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [navRef, setNavRef] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setNavRef(event.currentTarget);
    setIsOpen(true);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography variant="h6" noWrap className={styles.title}>
            <Link to="/">
              <FontAwesomeIcon icon={faVideoCamera} />
              Movie APP
            </Link>
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "end",
            }}
          >
            <HeaderMenu className={styles.link} />
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              justifyContent: "end",
            }}
          >
            <IconButton onClick={handleOpenNavMenu} color="inherit">
              <FontAwesomeIcon icon={faBars} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={navRef}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={isOpen}
              onClose={() => setIsOpen(false)}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <HeaderMenu className={styles.mobileLink} />
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
