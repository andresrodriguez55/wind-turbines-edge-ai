import { Box, IconButton, Typography, useTheme } from "@mui/material";
import LineChart from "./LineChart";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { tokens } from "../theme";

// Data = {time: ..., value: ...}
const LineChartColumn = (title, listOfJsons, xAxisKey, yAxisKey) =>
{
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box
        gridColumn="span 8"
        gridRow="span 2"
        backgroundColor={colors.primary[400]}
        >
            <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
            >
                <Box>
                    <Typography
                    variant="h3"
                    fontWeight="bold"
                    color={colors.greenAccent[500]}
                    >
                        {title}
                    </Typography>
                </Box>
                <Box>
                    <IconButton>
                        <DownloadOutlinedIcon
                        sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                        />
                    </IconButton>
                </Box>
            </Box>
            <Box height="330px" m="-20px 0 0 0">
                <LineChart isDashboard={true} listOfJsons={listOfJsons} xAxisKey={xAxisKey} yAxisKey={yAxisKey}/>
            </Box>
        </Box>
    );
}

export default LineChartColumn;