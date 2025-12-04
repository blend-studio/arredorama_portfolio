<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\Contact;

class PortfolioController extends Controller
{
    public function index() {
        return response()->json(Project::all());
    }

    public function show($id) {
        $project = Project::find($id);
        if (!$project) {
            return response()->json(['message' => 'Project not found'], 404);
        }
        return response()->json($project);
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
