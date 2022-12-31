import React from "react";
import { Box, useTheme } from "@mui/material";
import { useGetGeographyQuery } from "state/api";
import Header from "components/Header";
import { ResponsiveChoropleth } from "@nivo/geo";
import { geoData } from "state/geoData.js";
import ReactLoading from "react-loading";

const Geography = () => {
  const theme = useTheme();
  const { data } = useGetGeographyQuery();
  //console.log("data", data);
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Geography" subtitle="Find where your users are located." />
      <Box
        mt="40px"
        height="75vh"
        border={`1px solid ${theme.palette.secondary[200]}`}
        borderRadius="4px"
      >
        {data ? (
          <ResponsiveChoropleth
            data={data}
            theme={{
              axis: {
                domain: {
                  line: {
                    stroke: theme.palette.secondary[200],
                  },
                },
                legend: {
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
                ticks: {
                  line: {
                    stroke: theme.palette.secondary[200],
                    strokeWidth: 1,
                  },
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
              },
              legends: {
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
              tooltip: {
                container: {
                  color: theme.palette.primary.main,
                },
              },
            }}
            features={geoData.features}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            domain={[0, 30]}
            unknownColor="#fff"
            label="properties.name"
            valueFormat=".2s"
            projectionScale={150}
            projectionTranslation={[0.45, 0.6]}
            projectionRotation={[0, 0, 0]}
            borderWidth={0.5}
            borderColor="#000"
            isInteractive={true}
            legends={[
              {
                anchor: "bottom-left",
                direction: "column",
                justify: false,
                translateX: 4,
                translateY: -36,
                itemsSpacing: 0,
                itemWidth: 72,
                itemHeight: 21,
                itemDirection: "left-to-right",
                itemTextColor: theme.palette.secondary[200],
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: theme.palette.background.alt,
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        ) : (
          <Box
            m="20rem"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ReactLoading
              type="bubbles"
              color="#fff"
              height={"50px"}
              width={"50px"}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Geography;
