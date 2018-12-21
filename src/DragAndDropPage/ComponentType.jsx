import React from "react";

export default function ComponentType({componentType}) {
  return <div className={"component component-" + componentType}>{ componentType }</div>;
}