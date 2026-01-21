import { useSelector } from "react-redux";
import { useState } from "react";
import {Link} from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone, MapPin } from "lucide-react";

import {
  selectUser,
  selectAuthLoading,
} from "@/redux/selectors/userSelectors";

import EditProfileModal from "@/components/EditProfile";

export default function Profile() {
  const user = useSelector(selectUser);
  const loading = useSelector(selectAuthLoading);
  const [isEditOpen, setIsEditOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        User not available
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <Card className="max-w-3xl w-full rounded-2xl shadow">
          <CardContent className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <Avatar className="h-28 w-28">
                <AvatarImage src={user.photoURL || ""} />
                <AvatarFallback>
                  {user.displayName?.charAt(0)?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>

              <div>
                <h1 className="text-xl font-semibold">
                  {user.displayName || "Unnamed User"}
                </h1>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>

              <Button
                className="w-full rounded-xl"
                onClick={() => setIsEditOpen(true)}
              >
                Edit Profile
              </Button>
               <Button
                className="w-full rounded-xl"
                asChild
              >
                <Link to="/home">Home</Link>
              </Button>
            </div>

            <div className="md:col-span-2 space-y-4">
              <InfoItem
                icon={<Mail size={18} />}
                label="Email"
                value={user.email}
              />
              <InfoItem
                icon={<Phone size={18} />}
                label="Phone"
                value={user.phoneNumber}
              />
            <InfoItem
                icon={<MapPin size={18} />}
                label="Address"
                value={user.address}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {isEditOpen && (
        <EditProfileModal
          user={user}
          onClose={() => setIsEditOpen(false)}
        />
      )}
     

    </>
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <div className="flex gap-3 p-4 rounded-xl bg-gray-100">
      <div className="text-gray-500 mt-0.5">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium text-gray-800">{value || "—"}</p>
      </div>
    </div>
  );
}
