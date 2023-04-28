import { Box, CardMedia } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { apiProject } from "../../../api/apiProject";
import logo from "../../../assets/images/logo.svg";
import StepOne from "./feature/StepOne";
import StepThree from "./feature/StepThree";
import StepTwo from "./feature/StepTwo";

const Volunteer = () => {
  const [step, setStep] = React.useState(1);
  const [checkboxValue, csetCheckboxValue] = React.useState(false);
  const { id } = useParams();
  const [project, setProject] = React.useState();
  const [neededList, setNeededList] = React.useState([]);
  const [values, setValues] = React.useState({
    requirments: false,
    projectID: id.split(":")[1],
  });
  const handleChangeCheckboxValue = (event) => {
    csetCheckboxValue(event.target.checked);
    setValues({
      ...values,
      requirments: event.target.checked,
    });
  };
  const getProject = () => {
    let headers = {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    apiProject
      .getProject({ headers, id: id.split(":")[1] })
      .then(function (response) {
        // console.log(response);
        setProject(response.project);
        setNeededList(response.project.servicesNeeded)
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  React.useEffect(() => {
    getProject();
      document.title = `Volunteering | Philanthropy International`;
  }, []);
  return (
    <Box>
      <Box p={2} sx={{ borderBottom: "2px solid #0B5394" }}>
        <Box sx={{ width: "100px" }}>
          <CardMedia component="img" image={logo} alt="Paella dish" />
        </Box>
      </Box>
      <Box
        sx={{
          height: "calc(100vh - 76px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ width: { xs: "100%", sm: "504px" } }}>
          {step === 1 && (
            <StepOne
              setStep={setStep}
              setValues={setValues}
              values={values}
              neededList={neededList}
            />
          )}
          {step === 2 && (
            <StepTwo
              setStep={setStep}
              checkboxValue={checkboxValue}
              handleChangeCheckboxValue={handleChangeCheckboxValue}
              values={values}
            />
          )}
          {step === 3 && <StepThree project={project} values={values} />}
        </Box>
      </Box>
    </Box>
  );
};

export default Volunteer;
