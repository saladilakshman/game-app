import { Card, Skeleton, CardContent, CardMedia, Stack,useTheme,useMediaQuery } from "@mui/material";
const CardLayout = () => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Card sx={{ width:mobile ? '100%' : 300, height:mobile ? '100%' : 240}}>
      <CardMedia>
        <Skeleton variant="rounded" sx={{ height: 123 }} />
      </CardMedia>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          
        }}
      >
        <Skeleton
          variant="rectangle"
          sx={{ width: 149, height: 12, }}
        />
        <Skeleton
          variant="rounded"
          sx={{ width: 149, height: 12, marginLeft: -1 }}
        />
      </CardContent>

      <Stack
        direction="row"
        spacing={0.5}
        justifyContent="space-around"
        alignItems="center"
        sx={{
          marginBlockStart:3,
          marginBottom:mobile?1:'',
          padding:mobile?1:''
        }}
      >
        <Skeleton
          variant="rectangle"
          sx={{
            width: 95,
            height: 10,
          }}
        />
        <Stack direction="row" spacing={0.5}>
          <Skeleton
            variant="rounded"
            sx={{
              width: 20,
              borderRadius: "50%",
            }}
          ></Skeleton>
          <Skeleton
            variant="rounded"
            sx={{
              width: 20,
              borderRadius: "50%",
            }}
          ></Skeleton>
          <Skeleton
            variant="rounded"
            sx={{
              width: 20,
              borderRadius: "50%",
            }}
          ></Skeleton>
        </Stack>
      </Stack>
    </Card>
  );
};
export default CardLayout;
