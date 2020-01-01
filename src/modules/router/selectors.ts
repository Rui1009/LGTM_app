import { createSelector } from "@reduxjs/toolkit";
import qs from "qs";
import {CombineState} from "../RootModule";

const routerSelector = (state: CombineState) => state.router;
const pathname = createSelector(
  routerSelector,
  state => state.location.pathname
);

const query = createSelector(routerSelector, router =>
  qs.parse(router.location.search.replace(/\?/, ""))
);

export const selectors = {
  pathname,
  query
};
