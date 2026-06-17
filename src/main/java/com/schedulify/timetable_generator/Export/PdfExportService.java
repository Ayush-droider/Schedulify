package com.schedulify.timetable_generator.Export;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.schedulify.timetable_generator.Entity.TimeTableEntry;
import com.schedulify.timetable_generator.Enums.DayOfTheWeek;
import com.schedulify.timetable_generator.Repository.TimeTableEntryRepository;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.http.fileupload.ByteArrayOutputStream;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PdfExportService {
    private final TimeTableEntryRepository timeTableEntryRepository;

    public byte[] exportPDF(Long runId) throws IOException, DocumentException {
        List<TimeTableEntry> entries = timeTableEntryRepository.findByTimeTableRunId(runId);
        Document document = new Document();

        ByteArrayOutputStream out =
                new ByteArrayOutputStream();

        PdfWriter.getInstance(
                document,
                out
        );

        document.open();

        document.add(new Paragraph(
                "Generated On : "
                        + LocalDateTime.now()
        ));

        entries.sort(
                Comparator
                        .comparing(
                                (TimeTableEntry e)->e.getTeachingAssignment()
                                        .getTeacher()
                                        .getName()
                        )
                        .thenComparing(
                                (TimeTableEntry e) -> e.getTimeslot().getDay()
                        )
                        .thenComparing(
                                (TimeTableEntry e) -> e.getTimeslot().getStartTime()
                        )
        );

        Map<String,List<TimeTableEntry>> tables = entries.stream()
                        .collect(
                                Collectors.groupingBy(
                                        entry->entry.getTeachingAssignment()
                                                .getClassGroup()
                                                .getName()
                                )
                        );

        for(Map.Entry<String,List<TimeTableEntry>> groupedEntries : tables.entrySet()){
            String className=groupedEntries.getKey();

            Font titleFont =
                    FontFactory.getFont(
                            FontFactory.HELVETICA_BOLD,
                            18
                    );

            Paragraph title=new Paragraph(
                    className+" TimeTable",
                    titleFont
            );

            title.setAlignment(Element.ALIGN_CENTER);

            document.add(title);

            document.add(new Paragraph(" "));

            Map<DayOfTheWeek,Map<LocalTime,String>> timeTableGrid=new HashMap<>();

            for(TimeTableEntry entry:groupedEntries.getValue()){
                 DayOfTheWeek day=entry.getTimeslot().getDay();

                LocalTime start=entry.getTimeslot().getStartTime();

                String lectures=entry.getTeachingAssignment().getSubject().getSubjectName()+"\n"+
                        entry.getTeachingAssignment().getTeacher().getName()+"\nR-"+
                        entry.getRoom().getRoomNumber();

                timeTableGrid.computeIfAbsent(day,d->new HashMap<>())
                        .put(start,lectures);
            }

            Set<LocalTime> times=groupedEntries.getValue().stream()
                    .map(e->e.getTimeslot().getStartTime())
                    .collect(Collectors.toSet());

            List<LocalTime> sortedTimes=times
                    .stream()
                    .sorted()
                    .toList();

            PdfPTable table =
                    new PdfPTable(6);

            table.setWidthPercentage(100);

            table.setWidths(
                    new float[]{
                            1f,
                            2.5f,
                            2.5f,
                            2.5f,
                            2.5f,
                            2.5f
                    }
            );

            table.addCell(headerCell("Time"));
            table.addCell(headerCell("Monday"));
            table.addCell(headerCell("Tuesday"));
            table.addCell(headerCell("Wednesday"));
            table.addCell(headerCell("Thursday"));
            table.addCell(headerCell("Friday"));

            for(LocalTime time:sortedTimes){

                table.addCell(time.toString());

                for(DayOfTheWeek day:DayOfTheWeek.values()){

                    String lecture=timeTableGrid
                            .getOrDefault(day,new HashMap<>())
                            .getOrDefault(time,"-");

                    table.addCell(lecture);
                }
            }

            document.add(table);

        }
        document.close();

        return out.toByteArray();
    }

    public PdfPCell headerCell(
            String text
    ){
        PdfPCell cell = new PdfPCell(
                new Phrase(text)
        );

        cell.setBackgroundColor(
                BaseColor.LIGHT_GRAY
        );

        return cell;
    }
}
