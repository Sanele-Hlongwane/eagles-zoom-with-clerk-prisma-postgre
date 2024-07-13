"use client";
import Loading from "@/components/Loading";
import MeetingCard from "@/components/MeetingCard";
import useGetCallsByUser from "@/hooks/useGetCallsByUser";
import React from "react";
import Layout from "@/components/layout";

const ScheduledPage = () => {
  const { scheduled, isLoading } = useGetCallsByUser();
  console.log("🚀 ~ scheduled ~ callList:", scheduled?.title);
  return (
    <Layout>
      <div className="p-3 w-full h-full overflow-y-scroll bg-gray-900 text-white">
        <div className="font-bold text-4xl my-[50px]">Upcoming Meetings</div>
        <div
          id="meetingCardContainer"
          className="w-full mx-auto h-auto flex flex-wrap items-center content-start justify-start"
        >
          {isLoading && <Loading />}
          {scheduled ? (
            scheduled
              .sort(
                (a, b) => new Date(a.state.startsAt) - new Date(b.state.startsAt)
              )
              .map((call, index) => {
                console.log("🚀 ~ scheduled.map ~ call:", call.id);
                return (
                  <MeetingCard
                    key={index}
                    code={call.id}
                    title={call?.state?.custom?.title || "Instant meeting"}
                    description={
                      call?.state?.custom?.description || "No description"
                    }
                    date={
                      call?.state?.startsAt?.toLocaleString() || "unknown-date"
                    }
                    type="upcoming-calls"
                  />
                );
              })
          ) : !isLoading ? (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-300">
              No upcoming meetings
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ScheduledPage;
