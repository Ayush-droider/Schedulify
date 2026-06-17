package com.schedulify.timetable_generator.Export;

import com.schedulify.timetable_generator.Entity.TimeTableEntry;
import com.schedulify.timetable_generator.Repository.TimeTableEntryRepository;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ExcelExportService {
    private final TimeTableEntryRepository timeTableEntryRepository;

    public byte[] exportExcel(Long runId) throws IOException {
        List<TimeTableEntry> entries= timeTableEntryRepository.findByTimeTableRunId(runId);

        Workbook workbook = new XSSFWorkbook();

        Sheet sheet=workbook.createSheet("TimeTable");
        Row header=sheet.createRow(0);

        header.createCell(0).setCellValue("Subject");
        header.createCell(1).setCellValue("Teacher");
        header.createCell(2).setCellValue("ClassGroup");
        header.createCell(3).setCellValue("Room");
        header.createCell(4).setCellValue("Day");
        header.createCell(5).setCellValue("Start");
        header.createCell(6).setCellValue("End");

        int rowCount=1;
        for(TimeTableEntry entry:entries){
            Row row=sheet.createRow(rowCount++);
            row.createCell(0)
                    .setCellValue(
                            entry.getTeachingAssignment()
                                    .getSubject()
                                    .getSubjectName()
                    );
            row.createCell(1)
                    .setCellValue(
                            entry.getTeachingAssignment()
                                    .getTeacher()
                                    .getName()
                    );

            row.createCell(2)
                    .setCellValue(
                            entry.getTeachingAssignment()
                                    .getClassGroup()
                                    .getName()
                    );

            row.createCell(3)
                    .setCellValue(
                            entry.getRoom()
                                    .getRoomNumber()
                    );

            row.createCell(4)
                    .setCellValue(
                            entry.getTimeslot()
                                    .getDay()
                                    .name()
                    );

            row.createCell(5)
                    .setCellValue(
                            entry.getTimeslot()
                                    .getStartTime()
                                    .toString()
                    );

            row.createCell(6)
                    .setCellValue(
                            entry.getTimeslot()
                                    .getEndTime()
                                    .toString()
                    );

            for(int i=0;i<7;i++){  // har header ke liye columnsize add kar
                sheet.autoSizeColumn(i);
            }

        }
        ByteArrayOutputStream out=new ByteArrayOutputStream();
        workbook.write(out);
        return out.toByteArray();
    }
}
