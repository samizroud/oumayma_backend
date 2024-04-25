const path = require('path');
const fs = require('fs');
const Report = require('../models/rapportmodel');

const uploadReport = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Aucun fichier trouvé' });
    }

    const { filename, path: filePath } = req.file;

    const newReport = new Report({
      fileName: filename,
      filePath: filePath,
    });

    await newReport.save();

    return res.status(201).json({ message: 'Rapport téléchargé avec succès' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erreur lors du téléchargement du rapport' });
  }
};

const downloadReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.reportId);

    if (!report) {
      return res.status(404).json({ error: 'Rapport non trouvé' });
    }

    const reportPath = path.join(__dirname, report.filePath);
    const fileStream = fs.createReadStream(reportPath);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${report.fileName}`);

    fileStream.pipe(res);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erreur lors du téléchargement du rapport' });
  }
};

module.exports = { uploadReport, downloadReport };


