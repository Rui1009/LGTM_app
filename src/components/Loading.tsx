import {
    Grid,
    LinearProgress,
    Modal,
    Paper,
    Typography
  } from "@material-ui/core";
  import React from "react";
  import { useSelector } from "react-redux";
import { CombineState } from "../modules/RootModule";

  
  export type LoadingProps = {};
  
  const Loading: React.SFC<LoadingProps> = ({}: LoadingProps) => {
    const isLoading = useSelector((state: CombineState) => state.loading.isLoading);
    return (
      <Modal open={isLoading}>
        <Paper
          style={{
            width: "80%",
            height: 110,
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            margin: "auto",
            padding: 4,
            outline: "none"
          }}
        >
          <Grid>
            <Grid>
              <LinearProgress />
            </Grid>
            <Grid style={{ marginLeft: 8, marginTop: 16 }}>
              <Typography variant={"h5"}>ロード中です</Typography>
            </Grid>
            <Grid style={{ marginLeft: 8, marginTop: 8 }}>
              <Typography variant={"subtitle1"} style={{ color: "#aaaaaa" }}>
                しばらくお待ちください
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Modal>
    );
  };
  
  export default Loading;
  