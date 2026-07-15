import React from "react";

function TimetableGrid({ entries }) {

  const getEntry = (day, slot) => {
    return entries.find(
      (e) =>
        e.timeSlot.day === day &&
        `${e.timeSlot.startTime.substring(0, 5)}-${e.timeSlot.endTime.substring(0, 5)}` === slot
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <table className="w-full border-collapse">
        <thead className="bg-slate-800 text-white">
          <tr>
            <th className="p-4 border">Day</th>

            {timeSlots.map((slot) => (
              <th key={slot} className="p-4 border">
                {slot}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {days.map((day) => (
            <tr key={day}>
              <td className="font-bold p-4 border bg-slate-100">
                {day}
              </td>

              {timeSlots.map((slot) => {
                const entry = getEntry(day, slot);

                return (
                  <td
                    key={slot}
                    className="border p-3 h-32 align-top"
                  >
                    {entry ? (
                      <div className="bg-indigo-100 rounded-xl p-3 h-full">
                        <h3 className="font-bold text-indigo-800">
                          {entry.teachingAssignment.subject.name}
                        </h3>

                        <p className="text-sm text-gray-600">
                          👨‍🏫{" "}
                          {
                            entry.teachingAssignment.teacher.name
                          }
                        </p>

                        <p className="text-sm text-gray-600">
                          🏫 {entry.room.roomNumber}
                        </p>
                      </div>
                    ) : (
                      <div className="text-gray-400 text-center">
                        Free
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TimetableGrid;