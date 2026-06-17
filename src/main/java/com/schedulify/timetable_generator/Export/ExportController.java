package com.schedulify.timetable_generator.Export;

import com.itextpdf.text.DocumentException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api/timetable")
@RequiredArgsConstructor
public class ExportController {
    private final ExcelExportService excelExportService;
    private final PdfExportService pdfExportService;

    @GetMapping("/export/excel/{runId}")
    public ResponseEntity<byte[]> export(@PathVariable Long runId) throws IOException {
        byte[] data=excelExportService.exportExcel(runId);
        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=timetable.xlsx"
                )
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(data);
    }

    @GetMapping("/export/pdf/{runId}")
    public ResponseEntity<byte[]> exportPdf(@PathVariable Long runId) throws IOException, DocumentException {
        byte[] data= pdfExportService.exportPDF(runId);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=timetable.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(data);
    }
}
