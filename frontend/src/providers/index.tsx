import { createTheme, MantineProvider } from '@mantine/core';
import { PropsWithChildren } from 'react';

const theme = createTheme({
});
export function AppProvider({ children }: PropsWithChildren) {
    return <MantineProvider theme={theme}>
        {children}
    </MantineProvider>;
}