import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import CalendarDateRangePicker from "../ui/date-range-picker";

const Details = () => {
  return (
    <form className="flex flex-col gap-4">
      <div>
        {/* <Label htmlFor="name">Name</Label> */}
        <Input placeholder="Name" />
      </div>
      <div>
        {/* <Label htmlFor="name">Age</Label> */}
        <Input placeholder="Age" />
      </div>
      <div>
        {/* <Label htmlFor="name">Date of birth</Label> */}
        <Input placeholder="Date of birth" />
      </div>
      <div>
        {/* <Label htmlFor="name">Address</Label> */}
        <Textarea placeholder="Your Address." />
      </div>
    </form>
  );
};

export default Details;
