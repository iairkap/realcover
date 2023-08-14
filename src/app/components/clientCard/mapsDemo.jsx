"use client";

import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import southAmericaGeoJSON from "./provincias.json";
import customGeo from "./custom.geo.json";

const ArgentinaMap = () => {
  const data = [
    { provincia: "Buenos Aires", color: "#FF5733" },
    { provincia: "Córdoba", color: "#33FF57" },
    { provincia: "Santa Fe", color: "#5733FF" },
    { provincia: "Mendoza", color: "#FF5733" },
    { provincia: "Tucumán", color: "#33FF57" },
    { provincia: "Entre Ríos", color: "#5733FF" },
    { provincia: "Salta", color: "#FF5733" },
    { provincia: "Chaco", color: "#33FF57" },
    { provincia: "Corrientes", color: "#5733FF" },
    { provincia: "Santiago del Estero", color: "#FF5733" },
    { provincia: "Misiones", color: "#33FF57" },
    { provincia: "San Juan", color: "#5733FF" },
    { provincia: "Jujuy", color: "#FF5733" },
    { provincia: "Neuquén", color: "#33FF57" },
    { provincia: "La Rioja", color: "#5733FF" },
    { provincia: "Chubut", color: "#FF5733" },
    { provincia: "San Luis", color: "#33FF57" },
    { provincia: "Formosa", color: "#5733FF" },
    { provincia: "Catamarca", color: "#FF5733" },
    { provincia: "La Pampa", color: "#33FF57" },
    { provincia: "Mendoza", color: "#5733FF" },
    { provincia: "Santa Cruz", color: "#FF5733" },
    { provincia: "Tierra del Fuego", color: "#33FF57" },
  ];
  const provincesData = southAmericaGeoJSON.provincias.map((province) => ({
    provincia: province.nombre,
    color: getColorForProvince(province.nombre),
  }));

  function getColorForProvince(provinceName) {
    const found = data.find((p) => p.provincia === provinceName);
    return found ? found.color : "#EAEAEC"; // Return the found color or default color
  }
  return (
    <ComposableMap>
      <Geographies geography={customGeo}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const province = provincesData.find(
              (p) => p.provincia === geo.properties.NAME_1
            );
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: {
                    fill: province ? province.color : "#EAEAEC",
                    outline: "none",
                  },
                  hover: {
                    fill: province ? province.color : "#EAEAEC",
                    outline: "none",
                  },
                  pressed: {
                    fill: province ? province.color : "#EAEAEC",
                    outline: "none",
                  },
                }}
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
  );
};

export default ArgentinaMap;

// Tu arreglo de datos sería similar
