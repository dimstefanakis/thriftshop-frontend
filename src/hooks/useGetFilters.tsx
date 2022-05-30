import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useGetTechStacks from "../features/Filters/queries/useGetTechStacks";
import useGetCloudTypes from "../features/Filters/queries/useGetCloudTypes";
import useGetIndustries from "../features/Filters/queries/useGetIndustries";
import useGetFailureReasons from "../features/Filters/queries/useGetFailureReasons";
import useGetHostings from "../features/Filters/queries/useGetHostings";
import useGetPlatforms from "../features/Filters/queries/useGetPlatforms";
import useGetServices from "../features/Filters/queries/useGetServices";
import { setFilters } from "../features/Filters/filterSlice";
import { RootState } from "../../store";

function useGetFilters() {
  const dispatch = useDispatch();
  const techStacks = useGetTechStacks();
  const cloudTypes = useGetCloudTypes();
  const industries = useGetIndustries();
  const failureReasons = useGetFailureReasons();
  const hostings = useGetHostings();
  const platforms = useGetPlatforms();
  const services = useGetServices();

  const isDone =
    techStacks.status == "success" &&
    cloudTypes.status == "success" &&
    industries.status == "success" &&
    failureReasons.status == "success" &&
    hostings.status == "success" &&
    platforms.status == "success" &&
    services.status == "success";

  useEffect(() => {
    if (isDone) {
      dispatch(
        setFilters({
          cloudTypes: cloudTypes.data,
          failureReasons: failureReasons.data,
          hostings: hostings.data,
          platforms: platforms.data,
          services: services.data,
          techStacks: techStacks.data,
          industries: industries.data,
        })
      );
    }
  }, [
    techStacks.data,
    cloudTypes.data,
    industries.data,
    failureReasons.data,
    hostings.data,
    platforms.data,
    services.data,
    isDone,
  ]);

  return { isDone };
}

export default useGetFilters;
