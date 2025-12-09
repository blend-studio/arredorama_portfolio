<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\Project;
use App\Models\Contact;

class PortfolioController extends Controller
{
    public function index() {
        Log::info('PortfolioController: Loading all projects');
        try {
            return response()->json(Project::all());
        } catch (\Exception $e) {
            Log::error('PortfolioController: Error loading projects: ' . $e->getMessage());
            return response()->json(['message' => 'Internal Server Error'], 500);
        }
    }

    public function show($id) {
        try {
            $project = Project::find($id);
            if (!$project) {
                Log::warning("PortfolioController: Project {$id} not found");
                return response()->json(['message' => 'Project not found'], 404);
            }
            return response()->json($project);
        } catch (\Exception $e) {
            Log::error("PortfolioController: Error loading project {$id}: " . $e->getMessage());
            return response()->json(['message' => 'Internal Server Error'], 500);
        }
    }

    public function storeContact(Request $request) {
        $data = $request->validate([
            'email' => 'required|email',
            'message' => 'nullable|string'
        ]);
        
        Contact::create($data);
        
        // Qui puoi aggiungere Mail::to(...)->send(...)
        
        return response()->json(['status' => 'success']);
    }
}
