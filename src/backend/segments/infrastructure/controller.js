import { SegmentService } from '@/backend/segments/application/segments.service.js';
import { connectDB } from '@/db/mongodb';

const segmentService = new SegmentService();

export async function getAllSegmentsController() {
  try {
    await connectDB();
    const categories = await segmentService.getAllSegments();
    return categories;
  } catch (error) {
    console.error('Controller: Error fetching segments:', error);
    throw new Error(
      'Controller: Internal Server Error - getAllSegmentsController'
    );
  }
}

export async function getSegmentByData(segmentFilter) {
  try {
    await connectDB();
    const segmentsFiltered = await segmentService.getSegmentByData(
      segmentFilter
    );
    return segmentsFiltered;
  } catch (error) {
    console.error('Controller: Error fetching segments by filter:', error);
    throw new Error('Controller: Internal Server Error - getSegmentByData');
  }
}
