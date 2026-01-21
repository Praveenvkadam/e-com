import { useSelector, useDispatch } from "react-redux";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, MapPin, Briefcase, Github, Linkedin } from "lucide-react";

import {
  selectUser,
  selectUserStatus,
} from "@/redux/selectors/userSelectors";
import { openEditProfile } from "@/redux/slices/uiSlice";

export default function Profile() {
  const user = useSelector(selectUser);
  const status = useSelector(selectUserStatus);
  const dispatch = useDispatch();

  if (status === "loading") return <ProfileSkeleton />;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        User not available
      </div>
    );
  }

  return (
    <ProfileView
      user={user}
      onEdit={() => dispatch(openEditProfile())}
    />
  );
}

function ProfileView({ user, onEdit }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <Card className="max-w-3xl w-full shadow-lg rounded-2xl">
        <CardContent className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* LEFT */}
          <div className="flex flex-col items-center text-center space-y-4">
            <Avatar className="h-32 w-32">
              <AvatarImage
                src={user.avatarUrl ?? ""}
                alt={user.name ?? "User"}
              />
              <AvatarFallback>
                {user.name?.charAt(0)?.toUpperCase() ?? "U"}
              </AvatarFallback>
            </Avatar>

            <div>
              <h1 className="text-2xl font-semibold">
                {user.name || "Unnamed User"}
              </h1>
              <p className="text-gray-500">
                {user.role || "—"}
              </p>
            </div>

            <Button
              onClick={onEdit}
              className="w-full rounded-xl"
            >
              Edit Profile
            </Button>
          </div>

          {/* RIGHT */}
          <div className="md:col-span-2 space-y-6">
            <section>
              <h2 className="text-lg font-semibold mb-2">About</h2>
              <p className="text-gray-600 leading-relaxed">
                {user.about || "No description provided."}
              </p>
            </section>

            <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoItem
                icon={<Mail size={18} />}
                label="Email"
                value={user.email}
              />
              <InfoItem
                icon={<MapPin size={18} />}
                label="Location"
                value={user.location}
              />
              <InfoItem
                icon={<Briefcase size={18} />}
                label="Company"
                value={user.company}
              />
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">Links</h2>
              <div className="flex gap-3">
                {user.links?.github && (
                  <SocialButton
                    icon={<Github size={18} />}
                    href={user.links.github}
                  />
                )}
                {user.links?.linkedin && (
                  <SocialButton
                    icon={<Linkedin size={18} />}
                    href={user.links.linkedin}
                  />
                )}
              </div>
            </section>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* ---------- Helpers ---------- */

function InfoItem({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-100">
      <div className="text-gray-500 mt-0.5">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium text-gray-800">
          {value || "—"}
        </p>
      </div>
    </div>
  );
}

function SocialButton({ icon, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="h-10 w-10 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 transition"
    >
      {icon}
    </a>
  );
}

function ProfileSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-3xl p-6 space-y-4">
        <div className="h-32 w-32 rounded-full bg-gray-200 animate-pulse mx-auto" />
        <div className="h-6 w-1/2 bg-gray-200 animate-pulse mx-auto" />
        <div className="h-4 w-1/3 bg-gray-200 animate-pulse mx-auto" />
        <div className="h-24 bg-gray-200 animate-pulse rounded-xl" />
      </div>
    </div>
  );
}
