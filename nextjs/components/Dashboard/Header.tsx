import * as React from 'react';
import GlobalStyles from '@mui/joy/GlobalStyles';
import IconButton from '@mui/joy/IconButton';
import Sheet from '@mui/joy/Sheet';
import ColorSchemeToggleButton from '../Buttons/ColorSchemeToggleButton';
import {toggleSidebar} from '../../utils/utils';
import MenuIcon from '@mui/icons-material/Menu';
import Image from "next/image";
import logo from "../../public/logo.png"
import Link from "next/link";

export default function Header() {
    return (
        <Sheet
            sx={{
                display: {xs: 'flex', md: 'none'},
                alignItems: 'center',
                position: 'fixed',
                top: 0,
                width: '100vw',
                height: 'var(--Header-height)',
        zIndex: 9995,
        py: 1,
        px: 2,
        gap: 1,
        boxShadow: 'sm',
      }}
    >
            <GlobalStyles
                styles={(theme) => ({
                    ':root': {
                        '--Header-height': '52px',
                        [theme.breakpoints.up('md')]: {
                            '--Header-height': '0px',
                        },
                    },
                })}
            />
            <Link href="/">
                <Image alt={"logo"} src={logo} width={"24"} height={"24"}/>
            </Link>


            <IconButton
                onClick={() => toggleSidebar()}
                variant="outlined"
                color="neutral"
                size="sm"
            >
                <MenuIcon/>
            </IconButton>


            {/*<MuiLogo variant="plain" sx={{ boxShadow: 'none', mr: 'auto' }} />*/}
            <ColorSchemeToggleButton id={undefined}/>
        </Sheet>
  );
}
