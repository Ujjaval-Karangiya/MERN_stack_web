import React, { useState, useEffect } from "react";
import { Camera, Mail, User, Lock, Eye, EyeOff, Loader } from "lucide-react";
import useAuthStore from "../store/useAuthStore";

const ProfilePage = () => {
  const { authUser, updateProfile, isUpdatingProfile } = useAuthStore();

  // ------------------ State ------------------
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profilePic: "",
    password: "",
    confirmPassword: "",
  });

  const [profilePreview, setProfilePreview] = useState("/avatar.png");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ------------------ Sync with authUser ------------------
  useEffect(() => {
    if (authUser) {
      setFormData({
        name: authUser.fullName,
        email: authUser.email,
        profilePic: authUser.profilePic,
        password: "",
        confirmPassword: "",
      });
      setProfilePreview(authUser.profilePic || "/avatar.png");
    }
  }, [authUser]);

  // ------------------ Image Upload (Base64) ------------------
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      if (base64String) {
        setProfilePreview(base64String); // preview image
        setFormData((prev) => ({ ...prev, profilePic: base64String })); // save Base64
      }
    };
    reader.readAsDataURL(file); // convert file -> Base64
    console.log("Sending profilePic:", formData.profilePic.substring(0, 1000));
  };


  // ------------------ Submit ------------------
  const handleSubmit = async (e) => {
  e.preventDefault();

  // Validate password
  if (formData.password && formData.password.length < 6) {
    return alert("Password must be at least 6 characters long");
  }
  if (formData.password && formData.password !== formData.confirmPassword) {
    return alert("Passwords do not match");
  }

  // Prepare update payload
  const payload = {};
  if (formData.name !== authUser.fullName) payload.name = formData.name;
  if (formData.profilePic !== authUser.profilePic && formData.profilePic !== "")
    payload.profilePic = formData.profilePic;
  if (formData.password) payload.password = formData.password;

  if (Object.keys(payload).length === 0) {
    return alert("No changes to update");
  }

  await updateProfile({
  name: formData.name,
  profilePic: formData.profilePic,
  password: formData.password || undefined,
});

  // Reset passwords
  setFormData((prev) => ({
    ...prev,
    password: "",
    confirmPassword: "",
  }));
};



  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Edit Profile</h1>
            <p className="mt-2">Update your account information</p>
          </div>

          {/* Profile Picture */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={profilePreview || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4"
              />

              {/* Upload Button (Camera) */}
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                  }`}
              >
                <Camera className="w-5 h-5 text-base-200 z-10" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>

              {/* Reset to Default Button */}
              <button
                type="button"
                onClick={() => {
                  setProfilePreview("/avatar.png");
                  setFormData((prev) => ({ ...prev, profilePic: "" })); // reset in form
                }}
                className="absolute top-0 right-0 bg-red-500 hover:bg-red-600 p-1.5 rounded-full text-white shadow-md transition-all duration-200"
                disabled={isUpdatingProfile}
              >
                ↺
              </button>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile
                ? "Uploading..."
                : "Click the camera icon to change your photo or reset ↺"}
            </p>
          </div>


          {/* Update Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <User className="w-5 h-5 absolute left-3 top-3 text-base-content/40 z-10" />
                <input
                  type="text"
                  className="input input-bordered w-full pl-10"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Email (readonly) */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-3 top-3 text-base-content/40 z-10" />
                <input
                  type="email"
                  className="input input-bordered w-full pl-10"
                  value={formData.email}
                  disabled
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">New Password</span>
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-3 top-3 text-base-content/40 z-10" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-10"
                  placeholder="********"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-base-content/40" />
                  ) : (
                    <Eye className="w-5 h-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Confirm Password</span>
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-3 top-3 text-base-content/40 z-10" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-10"
                  placeholder="********"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5 text-base-content/40" />
                  ) : (
                    <Eye className="w-5 h-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isUpdatingProfile}
            >
              {isUpdatingProfile ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Updating...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </form>

          {/* Account Info */}
          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{authUser?.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
