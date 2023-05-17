import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

// Data = {time: ..., value: ...}
const DataInfoColumn = (title, listOfJsons, xAxisKey, yAxisKey) =>
{
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

return (
        <Box
        gridColumn="span 4"
        gridRow="span 2"
        backgroundColor={colors.primary[400]}
        overflow="auto"
        >
            <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
            >
                <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                    Recent {title} Data
                </Typography>
            </Box>
            {
                listOfJsons.map((t, i) => (
                    <Box
                    key={`${t}-${i}`}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    borderBottom={`4px solid ${colors.primary[500]}`}
                    p="15px"
                    >
                        <Box>
                            <Typography
                            color={colors.greenAccent[500]}
                            variant="h5"
                            fontWeight="500"
                            >
                                {t[xAxisKey]}
                            </Typography>
                        </Box>
                        <Box
                        backgroundColor={colors.greenAccent[500]}
                        p="5px 10px"
                        borderRadius="4px"  
                        >
                            {t[yAxisKey]}
                        </Box>
                    </Box>
                ))
            }
        </Box>
    );
}

export default DataInfoColumn;