import { Resolver } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export interface NewZoneFormSchemaProps {
  name: string;
}

const newZoneFormResolver: Resolver<NewZoneFormSchemaProps> = yupResolver(
  yup.object().shape({
    name: yup.string().max(200).required(),
  })
);

export { newZoneFormResolver };
