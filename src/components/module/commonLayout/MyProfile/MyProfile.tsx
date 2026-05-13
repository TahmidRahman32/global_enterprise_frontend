"use client";

import { updateMyProfile } from "@/components/services/auth/auth.service";
import { getInitials } from "@/lib/formatters";
import { UserInfo } from "@/Types/user.interfece";
import { Camera, Check, Loader2, Mail, Save, Shield, User, X, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface MyProfileProps {
   userInfo: UserInfo;
}

const inputClass =
   "w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-gray-100 placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/70 focus:bg-white/[0.05] focus:ring-2 focus:ring-indigo-500/10 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed";

const AvatarFallback = ({ name }: { name: string }) => (
   <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-600/40 via-violet-600/30 to-fuchsia-600/20 text-3xl font-bold text-white/80 select-none">{getInitials(name)}</div>
);

const MyProfile = ({ userInfo }: MyProfileProps) => {
   const router = useRouter();
   const [isPending, startTransition] = useTransition();
   const [previewImage, setPreviewImage] = useState<string | null>(null);
   const fileInputRef = useRef<HTMLInputElement>(null);

   const isAdmin = userInfo.role === "ADMIN";
   const isUser = userInfo.role === "USER";

   const profilePhoto = userInfo?.profilePhoto;
   const profileData = isAdmin ? userInfo.admin : isUser ? userInfo.user : null;

   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // Guard: only allow images under 5MB
      if (file.size > 5 * 1024 * 1024) {
         toast.error("Image too large", {
            description: "Please use an image smaller than 5 MB.",
         });
         e.target.value = "";
         return;
      }

      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);

      toast.success("Photo selected", {
         description: "Click Save to apply the new photo.",
      });
   };

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);
      const loadingToast = toast.loading("Updating profile...");

      startTransition(async () => {
         const result = await updateMyProfile(formData);

         toast.dismiss(loadingToast);

         if (result.success) {
            toast.success("Profile updated!", {
               description: "Your changes have been saved successfully.",
               duration: 3000,
            });
            setPreviewImage(null);
            router.refresh();
         } else {
            toast.error("Update failed", {
               description: result.message || "Please try again or contact support.",
               duration: 4000,
            });
         }
      });
   };

   return (
      <div className="min-h-screen bg-[#07080c] text-gray-100 font-sans">
         {/* Ambient background glow */}
         <div className="fixed inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-indigo-600/5 rounded-full blur-[120px]" />
            <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-violet-700/4 rounded-full blur-[100px]" />
         </div>

         <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-12">
            {/* ── Page heading ── */}
            <div className="mb-10">
               <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400/80 mb-2">Account</p>
               <h1 className="text-3xl font-bold text-white tracking-tight">My Profile</h1>
               <p className="text-sm text-gray-500 mt-1.5">Manage your personal information and account settings</p>
            </div>

            <form onSubmit={handleSubmit}>
               <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
                  {/* ── LEFT: Profile card ── */}
                  <div className="flex flex-col gap-4">
                     <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl overflow-hidden">
                        {/* Top accent strip */}
                        <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500" />

                        <div className="p-6 flex flex-col items-center gap-5">
                           {/* ── Avatar with upload overlay ── */}
                           <div className="relative group">
                              {/* Glow ring on hover */}
                              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-indigo-500/30 via-violet-500/20 to-fuchsia-500/20 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300 pointer-events-none" />

                              {/* Avatar circle */}
                              <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-indigo-500/50 transition-colors duration-300 shadow-xl shadow-black/40">
                                 {previewImage ? (
                                    <Image src={previewImage} alt="Preview" fill className="object-cover" sizes="112px" />
                                 ) : profilePhoto ? (
                                    <Image src={profilePhoto} alt={`${userInfo.name}'s profile photo`} fill className="object-cover" sizes="112px" />
                                 ) : (
                                    <AvatarFallback name={userInfo.name} />
                                 )}
                              </div>

                              {/* Camera overlay on hover */}
                              <button
                                 type="button"
                                 onClick={() => fileInputRef.current?.click()}
                                 disabled={isPending}
                                 aria-label="Change profile photo"
                                 className="absolute inset-0 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-1 cursor-pointer"
                              >
                                 <Camera className="w-5 h-5 text-white" />
                                 <span className="text-[10px] font-medium text-white/90 tracking-wide">Change</span>
                              </button>

                              {/* New photo indicator badge */}
                              {previewImage && (
                                 <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-indigo-500 border-2 border-[#07080c] flex items-center justify-center shadow-lg">
                                    <Check className="w-3 h-3 text-white" />
                                 </div>
                              )}

                              {/* Hidden file input */}
                              <input ref={fileInputRef} type="file" id="file" name="file" accept="image/*" className="hidden" onChange={handleImageChange} disabled={isPending} />
                           </div>

                           {/* Upload button */}
                           <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              disabled={isPending}
                              className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                           >
                              <Pencil className="w-3 h-3" />
                              {previewImage ? "Change selection" : "Upload new photo"}
                           </button>

                           {previewImage && <p className="text-[11px] text-amber-400/80 -mt-2">Save to apply the new photo</p>}

                           {/* Divider */}
                           <div className="w-full h-px bg-white/[0.06]" />

                           {/* Name & email summary */}
                           <div className="w-full space-y-1 text-center">
                              <p className="font-semibold text-gray-100 truncate">{userInfo.name}</p>
                              <p className="text-xs text-gray-500 truncate">{userInfo.email}</p>
                           </div>

                           {/* Role badge */}
                           <span
                              className={cn(
                                 "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold border tracking-wide",
                                 isAdmin ? "bg-amber-500/10 border-amber-500/25 text-amber-400" : "bg-indigo-500/10 border-indigo-500/25 text-indigo-400",
                              )}
                           >
                              {isAdmin ? <Shield className="w-3 h-3" /> : <User className="w-3 h-3" />}
                              {isAdmin ? "Admin" : "User"}
                           </span>

                           {/* Email row */}
                           <div className="w-full flex items-center gap-2 bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-2.5">
                              <Mail className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
                              <span className="text-xs text-gray-400 truncate">{userInfo.email}</span>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* ── RIGHT: Form card ── */}
                  <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 flex flex-col">
                     <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.07]">
                        <h2 className="text-sm font-semibold text-gray-200 tracking-tight">Personal Information</h2>
                        <span className="text-[11px] text-gray-600">* Required</span>
                     </div>

                     <div className="grid gap-5 md:grid-cols-2 flex-1">
                        {/* Full Name */}
                        <div className="flex flex-col gap-1.5">
                           <label htmlFor="name" className="text-[11px] font-semibold uppercase tracking-widest text-gray-500">
                              Full Name <span className="text-indigo-400">*</span>
                           </label>
                           <input id="name" name="name" defaultValue={profileData?.name || userInfo.name} required disabled={isPending} className={inputClass} placeholder="Your full name" />
                        </div>

                        {/* Email (read-only) */}
                        <div className="flex flex-col gap-1.5">
                           <label htmlFor="email-display" className="text-[11px] font-semibold uppercase tracking-widest text-gray-500">
                              Email Address
                           </label>
                           <div className="relative">
                              <input id="email-display" type="email" value={userInfo.email} disabled readOnly className={cn(inputClass, "pr-24")} />
                              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-medium text-gray-600 bg-white/5 border border-white/[0.08] rounded-md px-2 py-0.5">Read-only</span>
                           </div>
                        </div>
                     </div>

                     {/* ── Save button ── */}
                     <div className="flex items-center justify-between pt-6 mt-6 border-t border-white/[0.06]">
                        <p className="text-xs text-gray-600 hidden sm:block">Changes are saved immediately after clicking Save.</p>
                        <button
                           type="submit"
                           disabled={isPending}
                           className="ml-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white text-sm font-semibold transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/20"
                        >
                           {isPending ? (
                              <>
                                 <Loader2 className="w-4 h-4 animate-spin" />
                                 Saving…
                              </>
                           ) : (
                              <>
                                 <Save className="w-4 h-4" />
                                 Save Changes
                              </>
                           )}
                        </button>
                     </div>
                  </div>
               </div>
            </form>
         </div>
      </div>
   );
};

export default MyProfile;
