const express = require('express');
const router = express.Router();
const { CaseStudyService } = require('../models/CaseStudy');

// GET /api/case-studies
router.get('/', (req, res) => {
  const caseStudies = CaseStudyService.getAll();
  res.json({
    success: true,
    count: caseStudies.length,
    data: caseStudies
  });
});

// GET /api/case-studies/:slug
router.get('/:slug', (req, res) => {
  const study = CaseStudyService.getBySlug(req.params.slug);
  if (!study) {
    return res.status(404).json({ success: false, message: 'Case study not found.' });
  }
  res.json({
    success: true,
    data: study
  });
});

module.exports = router;
