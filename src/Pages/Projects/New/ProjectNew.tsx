import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../../Redux/configStore";
import { getAllProjectCategoryApi } from "../../../Redux/Reducers/projectReducer";

type Props = {};

const ProjectNew = (props: Props) => {
  const dispatch: DispatchType = useDispatch();
  const { projectCategories, projectDetail, error } = useSelector(
    (state: RootState) => state.projectReducer
  );
  const [showAddMembersModal, setShowAddMembersModal] = useState(false);

  useEffect(() => {
    dispatch(getAllProjectCategoryApi());
  }, [dispatch]);

  console.log(projectCategories);
  return <div>ProjectNew</div>;
};

export default ProjectNew;
