import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { getJobDetails } from "../services/jobs";
import BonusCard from "../components/joblisting/BonusCard";
import ContactCard from "../components/joblisting/ContactCard";
import JobHeadCard from "../components/joblisting/JobHeadCard";
import SharingCard from "../components/joblisting/SharingCard";
import ModalBlank from "../components/joblisting/ModalBlank";
import VerificationPage from "../partials/VerificationPage";
import { FullScreenLoader } from "../components/joblisting/Loader";
import ReferralPage from "../partials/ReferralPage";
import { ReferSingle } from "../services/refer";
import VerifiedComponent from "../components/joblisting/VerifiedComponent";
import ErrorComponent from "../components/joblisting/ErrorComponent";
import 'sweetalert2/src/sweetalert2.scss';

const JobListing = () => {
  const [id, setId] = useState("");
  const [verified, setVerified] = useState(false);

  const [loading, setLoading] = useState(true);
  const [jobError, setJobError] = useState(false);
  const [jobDetails, setJobDetails] = useState({});

  const [applyModal, setApplyModal] = useState(false);
  const [referModal, setReferModal] = useState(false);

  const jobFetchSuccess = (data) => {
    console.log(data);
    setJobDetails(data.data);
    setLoading(false);
  };

  const { data, mutate } = useMutation(getJobDetails, {
    onSuccess: jobFetchSuccess,
    onError: () => {
      setLoading(false);
      setJobError(true);
    },
  });

  const { mutate: jobMutate } = useMutation(ReferSingle, {
    onSuccess : ({data}) => {
      console.log(data);
      setApplyModal(true);
      setVerified(true);
    },
    onError: (data) =>{
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${data.response.data.msg}`,
      })},
  });

  const submitJob = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const referrorId = JSON.parse(localStorage.getItem("referrorId"));
    const phoneNumber = JSON.parse(localStorage.getItem("phoneNumber"));
    const reqBody = {
      categoryId: jobDetails?.category.id,
      referrorId: referrorId,
      roleId: id,
      hiringCompanyId: jobDetails?.company.id,
      name: user?.referror?.name || "",
      email: user?.referror?.email || "",
      phoneNumber: phoneNumber,
    };

    jobMutate(reqBody);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setVerified(true);
    }
    const urlId = window.location.href.split("?id=")[1];
    if (!urlId) {
      setLoading(false);
      setJobError(true);
      return;
    }
    setId(urlId);
    mutate(urlId);
  }, []);
  return (
    <div className="w-full">
      {loading ? (
        <FullScreenLoader />
      ) : jobError ? (
        <ErrorComponent />
      ) : (
        <div className="flex md:flex-row flex-col justify-center mx-auto py-4 px-2 gap-12">
          <div className="flex flex-col space-y-4 md:w-1/3">
            <div className="flex flex-row justify-between">
              <h1 className="text-2xl font-bold text-blue-900">Wroots</h1>
              <div className="flex flex-row space-x-3 mt-1">
                {/* <h1 className="text-sm font-medium">
                  Job ad Updated : 1 day ago
                </h1> */}
                <h1 className="text-sm font-medium">
                  Job ID : {jobDetails.id}
                </h1>
              </div>
            </div>

            <div className="flex flex-col space-y-2 w-1/2">
              <h1 className="text-xl font-bold">{jobDetails.name}</h1>
              <h1 className="text-sm font-medium">
                <span className="text-blue-600">
                  {jobDetails.company.name} -
                </span>
                {jobDetails.location.map((loc) => {
                  return (
                    <span key={loc.id} className="text-gray-500">
                      {" "}
                      {loc.name},{" "}
                    </span>
                  );
                })}
              </h1>
            </div>

            <div className="border-t-2"></div>

            <JobHeadCard jobDetails={jobDetails} />

            <BonusCard
              referralAmount={jobDetails.referralAmount}
              setReferModal={setReferModal}
            />

            <div className="flex flex-col gap-4">
              <h1 className="text-xl font-bold">Job Overview</h1>
              <div
                className="flex flex-col space-y-1"
                dangerouslySetInnerHTML={{ __html: jobDetails.briefing }}
              />
            </div>
          </div>

          {/* Second Section */}
          <div className="flex flex-col space-y-6 items-center">
            <div className="flex flex-col justify-center items-center space-y-3 py-4 rounded-lg w-64 bg-blue-50">
              <h1 className="font-medium">Sounds like a match?</h1>
              <button
                onClick={() => {
                  if (verified) {
                    submitJob();
                  } else {
                    setApplyModal(true);
                  }
                }}
                className="px-4 py-2 bg-green-500 text-white rounded-lg w-3/4 hover:bg-green-600 transition-colors duration-300"
              >
                Apply Now
              </button>
              <button
                onClick={() => setReferModal(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg w-3/4 hover:bg-blue-600 transition-colors duration-300"
              >
                Refer & Earn Upto{" "}
                {jobDetails.referralAmount.toLocaleString("en-IN", {
                  maximumFractionDigits: 0,
                  style: "currency",
                  currency: "INR",
                })}
              </button>
            </div>

            <SharingCard />

            <ContactCard />
          </div>
        </div>
      )}
      <ModalBlank
        openModal={applyModal}
        setOpenModal={setApplyModal}
        title={"Apply For Job"}
      >
        {verified ? (
          <VerifiedComponent />
        ) : (
          <VerificationPage setVerified={setVerified} submitJob={submitJob} setApplyModal={setApplyModal} />
        )}
      </ModalBlank>
      <ModalBlank
        openModal={referModal}
        setOpenModal={setReferModal}
        title={"Refer more People"}
      >
        {verified ? (
          <ReferralPage
            referralAmount={jobDetails.referralAmount}
            jobDetails={jobDetails}
            roleId={id}
          />
        ) : (
          <VerificationPage setVerified={setVerified} submitJob={submitJob} setApplyModal={setApplyModal} />
        )}
      </ModalBlank>
    </div>
  );
};

export default JobListing;
