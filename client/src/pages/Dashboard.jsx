import {
  FilePenLineIcon,
  LoaderCircleIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadCloudIcon,
  XIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../configs/api";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import pdfToText from "react-pdftotext";

const Dashboard = () => {
  const { user, token } = useSelector((state) => state.auth);

  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"];
  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState("");
  const [resume, setResume] = useState(null);
  const [editResumeId, setEditResumeId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const loadAllResumes = async () => {
    try {
      const { data } = await api.get("/api/users/resumes", {
        headers: { Authorization: token },
      });
      setAllResumes(data.resumes);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  // CREATE
  const createResume = async (e) => {
    e.preventDefault();
    if (!title.trim()) return toast.error("Title is required");

    try {
      const { data } = await api.post(
        "/api/resumes/create",
        { title },
        { headers: { Authorization: token } }
      );
      setAllResumes([...allResumes, data.resume]);
      setTitle("");
      setShowCreateResume(false);
      navigate(`/app/builder/${data.resume._id}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  // UPLOAD
  const uploadResume = async (e) => {
    e.preventDefault();

    if (!title.trim()) return toast.error("Title is required");
    if (!resume) return toast.error("Please select a PDF file");

    setIsLoading(true);
    try {
      const resumeText = await pdfToText(resume);

      const { data } = await api.post(
        "/api/ai/upload-resume",
        { title, resumeText },
        { headers: { Authorization: token } }
      );

      setTitle("");
      setResume(null);
      setShowUploadResume(false);
      navigate(`/app/builder/${data.resumeId}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // EDIT
  const editTitle = async (e) => {
    e.preventDefault();
    if (!title.trim()) return toast.error("Title is required");

    try {
      const { data } = await api.put(
        "/api/resumes/update",
        { resumeId: editResumeId, resumeData: { title } },
        { headers: { Authorization: token } }
      );

      setAllResumes(
        allResumes.map((r) => (r._id === editResumeId ? { ...r, title } : r))
      );

      setTitle("");
      setEditResumeId("");
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  // DELETE
  const deleteResume = async (resumeId) => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this resume?"
      );
      if (confirm) {
        const { data } = await api.delete(`/api/resumes/delete/${resumeId}`, {
          headers: { Authorization: token },
        });
        setAllResumes(allResumes.filter((resume) => resume._id !== resumeId));
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    loadAllResumes();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <p className="text-2xl font-medium mb-6 text-slate-700">
        Welcome, {user?.name || "User"}
      </p>

      {/* Buttons */}
      <div className="flex gap-4 mb-6 flex-wrap">
        <button
          onClick={() => setShowCreateResume(true)}
          className="w-full sm:w-48 h-48 flex flex-col items-center justify-center rounded-xl gap-3 text-slate-700 border-2 border-dashed border-slate-300 hover:border-indigo-500 hover:shadow-xl transition transform hover:-translate-y-1"
        >
          <PlusIcon className="w-10 h-10 p-2.5 bg-indigo-500 text-white rounded-full shadow-md" />
          <span className="text-sm font-semibold">Create Resume</span>
        </button>

        <button
          onClick={() => setShowUploadResume(true)}
          className="w-full sm:w-48 h-48 flex flex-col items-center justify-center rounded-xl gap-3 text-slate-700 border-2 border-dashed border-slate-300 hover:border-purple-500 hover:shadow-xl transition transform hover:-translate-y-1"
        >
          <UploadCloudIcon className="w-10 h-10 p-2.5 bg-purple-500 text-white rounded-full shadow-md" />
          <span className="text-sm font-semibold">Upload Existing</span>
        </button>
      </div>

      <hr className="my-6 border-gray-300" />

      {/* Resume Cards */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {allResumes.map((resume, index) => {
          const baseColor = colors[index % colors.length];
          return (
            <div
              key={resume._id}
              className="relative group cursor-pointer w-full h-52 flex flex-col items-center justify-center rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 bg-white border"
              style={{
                background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}20)`,
              }}
              onClick={() => navigate(`/app/builder/${resume._id}`)}
            >
              <FilePenLineIcon
                className="w-10 h-10 mb-2"
                style={{ color: baseColor }}
              />
              <p className="font-semibold text-lg" style={{ color: baseColor }}>
                {resume.title}
              </p>

              {/* Action Buttons */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 flex gap-1 transition-opacity">
                <TrashIcon
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteResume(resume._id);
                  }}
                  className="w-6 h-6 p-1 hover:bg-red-100 rounded text-red-600"
                />
                <PencilIcon
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditResumeId(resume._id);
                    setTitle(resume.title);
                  }}
                  className="w-6 h-6 p-1 hover:bg-blue-100 rounded text-blue-600"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* CREATE MODAL */}
      {showCreateResume && (
        <form
          onSubmit={createResume}
          onClick={() => setShowCreateResume(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white shadow-2xl rounded-xl w-full max-w-sm p-6"
          >
            <h2 className="text-xl font-bold mb-4">Create Resume</h2>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded mb-4"
              placeholder="Resume title"
            />
            <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
              Create
            </button>
            <XIcon
              onClick={() => setShowCreateResume(false)}
              className="absolute top-4 right-4 cursor-pointer text-gray-600 hover:text-gray-800"
            />
          </div>
        </form>
      )}

      {/* UPLOAD MODAL */}
      {showUploadResume && (
        <form
          onSubmit={uploadResume}
          onClick={() => setShowUploadResume(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white shadow-2xl rounded-xl w-full max-w-sm p-6"
          >
            <h2 className="text-xl font-bold mb-4">Upload Resume</h2>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded mb-4"
              placeholder="Resume title"
            />

            <label
              htmlFor="resume-input"
              className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-slate-300 rounded-lg p-6 text-center cursor-pointer
             hover:border-green-500 hover:bg-green-50 transition"
            >
              <UploadCloudIcon className="w-10 h-10 text-slate-400" />
              {resume ? (
                <p className="text-green-600 text-sm font-medium">{resume.name}</p>
              ) : (
                <p className="text-slate-500 text-sm">
                  Click to upload or drag & drop PDF
                </p>
              )}
              <input
                id="resume-input"
                type="file"
                hidden
                accept=".pdf"
                onChange={(e) => setResume(e.target.files[0])}
              />
            </label>

            <button
              disabled={isLoading}
              className="w-full mt-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2"
            >
              {isLoading && <LoaderCircleIcon className="animate-spin w-5 h-5" />}
              {isLoading ? "Uploading..." : "Upload Resume"}
            </button>

            <XIcon
              onClick={() => setShowUploadResume(false)}
              className="absolute top-4 right-4 cursor-pointer text-gray-600 hover:text-gray-800"
            />
          </div>
        </form>
      )}

      {/* EDIT MODAL */}
      {editResumeId && (
        <form
          onSubmit={editTitle}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white shadow-2xl rounded-xl w-full max-w-sm p-6"
          >
            <h2 className="text-xl font-bold mb-4">Edit Title</h2>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded mb-4"
            />
            <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
              Update
            </button>
            <XIcon
              onClick={() => setEditResumeId("")}
              className="absolute top-4 right-4 cursor-pointer text-gray-600 hover:text-gray-800"
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default Dashboard;
