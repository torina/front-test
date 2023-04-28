import { Box, Grid } from "@mui/material";
import Logo from "../../../assets/images/logo.svg";
import { useState } from "react";
import ButtonCustom from "../../buttonCustom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Sidebar from "./feature/Sidebar";
import StepOne from "./feature/StepOne";
import StepTwo from "./feature/StepTwo";
import StepThree from "./feature/StepThree";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiUser } from "../../../api/apiUser";
import { apiProject } from "../../../api/apiProject";
import { useLocation } from "react-router-dom";

const items = [
  { title: "USD", icon: "$" },
  { title: "EUR", icon: "€" },
  { title: "GBP", icon: "£" },
];

const CreateProject = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const navigate = useNavigate();
  const [draftId, setDraftId] = useState(params.get("draftId"));
  const [errForm, setErrForm] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [loader, setLoader] = useState(false);
  const [values, setValues] = useState({
    projectName: "",
    // linkedin: "",
    // facebook: "",
    webSite: "",
    categories: [],
    typeOfSupport: "Nothing",
    startDate: (new Date() - new Date(1000*60*60*24*365)),
    endDate: new Date(),
    currency: { title: "USD", icon: "$" },
    price: "",
    requirements: "",
    link: [{}],
    volunteeringServices: [],
  });

  const handleChangeValues = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleChange = (newValue) => {
    if (activeTab === 0) {
      if (
        values.categories.length < 1 ||
        !values.projectName ||
        (!values.background && !values.backgroundImage) ||
        !values?.description?.replace(/(<([^>]+)>)/gi, "") ||
        !values.description
      ) {
        setErrForm(true);
      } else {
        setErrForm(false);
        submitDraft({preview: false});
        setActiveTab(newValue - 1);
      }
    }
    else {
      setErrForm(false);
      submitDraft({preview: false});
      setActiveTab(newValue - 1);
    }
  };
  const handleChangeStep = (newValue) => {
    setActiveTab(newValue);
  };

  const [openMobileSideBar, setOpenMobileSideBar] = useState(false);

  const handleBackgroundClick = (event) => {
    event.preventDefault();
    if (event.target === event.currentTarget) {
      setOpenMobileSideBar(false);
    }
  };

  const getDraft = () => {
    setLoader(true);
    let headers = {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    apiProject
      .getProject({ headers, id: draftId })
      .then(function (response) {
        // console.log("project:", response);
        if (!response.project) {
          navigate(`/create_project`);
        } else {
          setValues({
            ...values,
            volunteeringServices: response?.project?.servicesNeeded,
            projectName: response?.project?.projectName,
            categories: response?.project?.sector,
            description: response?.project?.description,
            webSite: response?.project?.webSite,
            typeOfSupport: response?.project?.typeOfSupport,
            startDate: response?.project?.startDate,
            endDate: response?.project?.endDate,
            currency: items?.find(
              (o) => o.icon === response?.project?.goalAmount[0]
            ),
            requirements: response?.project?.requirements,
            price: response?.project?.goalAmount.substring(1),
            backgroundImage: response?.project?.links?.find(
              (o) => o.type === "background"
            )
              ? `${process.env.REACT_APP_API_URL}${
                  response?.project?.imagesPath
                }${response?.project?.links
                  ?.find((o) => o.type === "background")
                  .link.split(" ")
                  .join("%20")}`
              : "",
            teamMembers: response?.project?.teamMembers,
            imagesPath: response?.project?.imagesPath,
          });
          setLoader(false);
        }
      })
      .catch(function (error) {
        console.log(error);
        setLoader(false);
      });
  };

  const updateDraft = ({ newProject, preview }) => {
    setLoader(true);
    let headers = {
      authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "multipart/form-data",
      type: "array",
      id: draftId,
    };
    let data = {
      ...values,
      goalAmount: values?.currency?.icon + values?.price,
      servicesNeeded: values?.volunteeringServices,
      sector: values?.categories,
      id: draftId,
    };
    if (newProject) {
      data = { ...data, isDraft: false, status: 'Active' };
    }
    apiProject
      .updateProject({ headers, data })
      .then(function (response) {
        // console.log("update:", response);
        if (!newProject) {
          setValues({
            ...values,
            volunteeringServices: response?.project?.servicesNeeded,
            projectName: response?.project?.projectName,
            categories: response?.project?.sector,
            description: response?.project?.description,
            webSite: response?.project?.webSite,
            typeOfSupport: response?.project?.typeOfSupport,
            startDate: response?.project?.startDate,
            endDate: response?.project?.endDate,
            currency: items?.find(
              (o) => o.icon === response?.project?.goalAmount[0]
            ),
            requirements: response?.project?.requirements,
            price: response?.project?.goalAmount.substring(1),
            backgroundImage: response?.project?.links?.find(
              (o) => o.type === "background"
            )
              ? `${process.env.REACT_APP_API_URL}${
                  response?.project?.imagesPath
                }${response?.project?.links
                  ?.find((o) => o.type === "background")
                  .link.split(" ")
                  .join("%20")}`
              : "",
            teamMembers: response?.project?.teamMembers,
            imagesPath: response?.project?.imagesPath,
          });
        } else {
          navigate("/projects");
        }
        setLoader(false);
        if(preview === true){
          window.open(`/preview/${response?.project?._id}`,'_blank');
        }
      })
      .catch(function (error) {
        console.log(error);
        setLoader(false);
      });
  };

  const submitDraft = ({preview}) => {
    if (draftId) {
      updateDraft({ newProject: false, preview });
    } else {
      setLoader(true);
      setValues({
        ...values,
        goalAmount: values?.price,
      });
      const data = {
        ...values,
        goalAmount: values?.currency?.icon + values?.price,
        servicesNeeded: values?.volunteeringServices,
        sector: values?.categories,
        isDraft: true,
        status: 'Draft'
      };
      const headers = {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
        type: "array",
      };
      apiUser
        .createProject(data, headers)
        .then(function (response) {
          // console.log("response", response);
          setLoader(false);
          navigate(`/create_project?draftId=${response?.project?._id}`);
          setDraftId(response?.project?._id);
          if(preview === true){
            window.open(`/preview/${response?.project?._id}`,'_blank');
          }
        })
        .catch(function (error) {
          console.log(error);
          setLoader(false);
        });
    }
  };

  const openPreview = () => {
    submitDraft({ preview: true });
  };

  const submitForm = () => {
    if (activeTab === 0) {
      if (
        values.categories.length < 1 ||
        !values.projectName ||
        (!values.background && !values.backgroundImage) ||
        !values?.description?.replace(/(<([^>]+)>)/gi, "") ||
        !values.description
      ) {
        setErrForm(true);
      } else {
        submitDraft({preview: false});
        handleChangeStep(1);
        setErrForm(false);
      }
    }
    if (activeTab === 1) {
      submitDraft({preview: false});
      handleChangeStep(2);
    }
    if (activeTab === 2) {
      setLoader(true);
      setValues({
        ...values,
        goalAmount: values?.price,
      });
      const data = {
        ...values,
        goalAmount: values?.currency?.icon + values?.price,
        servicesNeeded: values?.volunteeringServices,
        sector: values?.categories,
      };
      if (
        !values.projectName ||
        values.categories.length < 1 ||
        !values.description ||
        !values?.description?.replace(/(<([^>]+)>)/gi, "") ||
        (!values.background && !values.backgroundImage)
      ) {
        setErrForm(true);
        setLoader(false);
      } else if (values.typeOfSupport === "Financial" && !values.price) {
        setErrForm(true);
        setLoader(false);
      } else {
        if (draftId) {
          updateDraft({ newProject: true, preview: false });
        } else {
          const headers = {
            authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
            type: "array",
          };
          apiUser
            .createProject(data, headers)
            .then(function (response) {
              // console.log("response", response);
              setLoader(false);
              navigate("/projects");
            })
            .catch(function (error) {
              console.log(error);
              setLoader(false);
            });
        }
      }
    }
  };

  React.useEffect(() => {
    document.title = `Create Project | Philanthropy International`;
  }, []);

  React.useEffect(() => {
    if (draftId) {
      getDraft();
    }
  }, [draftId]);

  return (
    <Box sx={{ height: "100vh" }}>
      <Box
        sx={{
          p: "18px 32px 18px 19px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #E5E7EB",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <FormatAlignLeftIcon
            onClick={() => setOpenMobileSideBar(true)}
            sx={{
              display: { xs: "flex", md: "none" },
              color: "#6B7280",
              p: "0.5rem",
              border: "1px solid #E5E5E5",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          />
          <Box sx={{ height: "39px", width: "94.8px", ml: "1rem" }}>
            <Link className="underlineNone" to={`/dashboard`}>
              <img
                src={Logo}
                alt="logo"
                style={{ maxInlineSize: "100%", blockSize: "auto" }}
              />
            </Link>
          </Box>
        </Box>
        <ButtonCustom
          onClick={openPreview}
          title="Preview"
          color="white"
          icon={<RemoveRedEyeIcon sx={{ mr: 1 }} />}
          sx={{ fontWeight: 600 }}
        />
      </Box>
      <Grid container>
        <Grid item xs={0} md={4} sx={{ display: { xs: "none", md: "block" } }}>
          <Sidebar activeTab={activeTab} handleChange={handleChange} />
        </Grid>
        <Grid
          item
          xs={12}
          md={0}
          onClick={(e) => handleBackgroundClick(e)}
          sx={{
            zIndex: 11,
            display: { xs: openMobileSideBar ? "block" : "none", md: "none" },
            height: "100vh",
            width: "100%",
            top: "0",
            left: "0",
            position: "absolute",
            bgcolor: "rgba(0,0,0,.45)",
          }}
        >
          <Box sx={{ width: "80%", height: "100%", bgcolor: "#fff" }}>
            <Sidebar activeTab={activeTab} handleChange={handleChange} />
          </Box>
        </Grid>
        <Grid
          item
          // className="noneScroll"
          xs={12}
          md={8}
          sx={{ height: "calc(100vh - 90px)", overflow: "auto" }}
        >
          {activeTab === 0 && (
            <StepOne
              values={values}
              setValues={setValues}
              handleChangeValues={handleChangeValues}
              submitForm={submitForm}
              submitDraft={submitDraft}
              errForm={errForm}
              loader={loader}
            />
          )}
          {activeTab === 1 && (
            <StepTwo
              values={values}
              setValues={setValues}
              submitForm={submitForm}
              submitDraft={submitDraft}
              loader={loader}
            />
          )}
          {activeTab === 2 && (
            <StepThree
              values={values}
              setValues={setValues}
              handleChangeValues={handleChangeValues}
              handleChangeStep={handleChangeStep}
              submitForm={submitForm}
              submitDraft={submitDraft}
              loader={loader}
              errForm={errForm}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreateProject;
